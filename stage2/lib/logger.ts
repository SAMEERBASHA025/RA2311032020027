// Custom Logging Middleware as per Evaluation Requirements

export interface LogEntry {
    stack: 'frontend' | 'backend';
    level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    package: string;
    message: string;
}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnNlZXhwiJoxNzQzNTc0MzQ0LCJpYyOiE3NDM1NzQwNDQsImI0NzkyZysInN1YiI6InJhbWtyaXNobmEAYWJjLmVkdSJLCJlWbWfpbCI6InJhbWtyaXNobmEAYWJjLmVkdSInMS5hbWUiOiJyYW1rcmlzaG5hIiwjInVjbXByOByI6ImFhMmliiwYWNjZXNzQ29kZSI6InhnQXNNCiIsImNsaWVudElkIjoiZDljYmI2OTktNmEyNy00NGE1LThkNTktOGIxYmVmYTgxNmRhInVpYmRnMmRIY2pZWzU0U2VjcmV0IjoiZkYwU0JKTZVhjUlh1TSJ9.YApD98g0IN_Oww7JMFmuUfK1m4hLTm7AiCLDcLAzVg';

class NotificationLogger {
    private localLogs: any[] = [];

    /**
     * Required Log function as per Pre-Test Setup.
     * Makes an API call to the Log API.
     */
    public async Log(stack: 'frontend' | 'backend', level: LogEntry['level'], pkg: string, message: string) {
        const payload: LogEntry = { stack, level, package: pkg, message };
        
        // Local tracking for debugging
        this.localLogs.push({ ...payload, timestamp: new Date().toISOString() });
        
        try {
            // Actual API Call to Log Server
            await fetch('http://20.207.122.201/evaluation-service/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify(payload)
            });
            
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('app-log', { detail: payload }));
            }
        } catch (err) {
            console.warn('Logging API failed (check token or connection)', err);
        }
    }

    public getLogs() {
        return this.localLogs;
    }
}

export const logger = new NotificationLogger();

// Convenience wrapper for the frontend
export function logFrontend(level: LogEntry['level'], pkg: string, message: string) {
    return logger.Log('frontend', level, pkg, message);
}

// Middleware wrapper for functions
export function withLogging<T extends (...args: any[]) => any>(
    fn: T,
    actionName: string,
    pkg: string = 'api'
): (...args: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>) => {
        logger.Log('frontend', 'info', pkg, `Executing ${actionName}`);
        try {
            const result = fn(...args);
            if (result instanceof Promise) {
                return result.then(res => {
                    logger.Log('frontend', 'info', pkg, `Completed ${actionName}`);
                    return res;
                }).catch(err => {
                    logger.Log('frontend', 'error', pkg, `Failed ${actionName}: ${err.message}`);
                    throw err;
                }) as any;
            }
            logger.Log('frontend', 'info', pkg, `Completed ${actionName}`);
            return result;
        } catch (err: any) {
            logger.Log('frontend', 'error', pkg, `Failed ${actionName}: ${err.message}`);
            throw err;
        }
    };
}
