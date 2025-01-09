import path from 'path';
import { spawn } from 'child_process';
import { watchFile, unwatchFile } from 'fs';
import { closeDB } from './initDB.js';
import treeKill from './utils/tree-kill.js';

console.clear();

let activeProcess = null;

/**
 * Start or restart the child process
 * @param {string} file - The file to execute
 */
function start(file) {
    if (activeProcess) {
        console.log('Stopping existing process...');
        treeKill(activeProcess.pid, 'SIGTERM', (err) => {
            if (err) {
                console.error('Error stopping process:', err.message);
            } else {
                console.log('Process stopped.');
                activeProcess = null;
                start(file); // Restart the process
            }
        });
        return;
    }

    console.log('Starting process...');
    const args = [path.join(process.cwd(), file), ...process.argv.slice(2)];
    const child = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });

    child.on('message', (data) => {
        console.log('[MESSAGE RECEIVED]', data);
        switch (data) {
            case 'reset':
                console.log('Restarting process on request...');
                start(file);
                break;
            case 'uptime':
                child.send(process.uptime());
                break;
            default:
                console.log('Unknown message:', data);
        }
    });

    child.on('exit', (code) => {
        console.error(`Process exited with code: ${code}`);
        if (Number(code) === 0) return;

        // Restart on file changes
        watchFile(args[0], () => {
            unwatchFile(args[0]);
            console.log('File changed. Restarting process...');
            start(file);
        });
    });

    activeProcess = child;
}

/**
 * Handle termination signals for cleanup
 */
function handleTermination() {
    console.log('Termination signal received. Cleaning up...');
    if (activeProcess) {
        treeKill(activeProcess.pid, 'SIGTERM', (err) => {
            if (err) {
                console.error('Error during cleanup:', err.message);
            }
            console.log('Process terminated. Exiting...');
            closeDB(); // Clean up database connections
            process.exit(0);
        });
    } else {
        closeDB();
        process.exit(0);
    }
}

// Handle termination signals (e.g., Ctrl+C)
process.on('SIGINT', handleTermination);
process.on('SIGTERM', handleTermination);

// Start the main script
start('./app.js');
