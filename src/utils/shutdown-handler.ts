import { CommentService } from '../services/comment.services';

export class ShutdownHandler {
  private static isShuttingDown = false;

  static async gracefulShutdown(signal: string, app?: any): Promise<void> {
    if (ShutdownHandler.isShuttingDown) {
      console.log('Shutdown already in progress...');
      return;
    }

    ShutdownHandler.isShuttingDown = true;
    console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
    
    try {
      // Close database connections
      await CommentService.disconnect();
      console.log("✅ Database connections closed");
      
      // Stop the server if provided
      if (app && typeof app.stop === 'function') {
        await app.stop();
        console.log("✅ Server stopped");
      }
      
      console.log("Graceful shutdown completed");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  }

  static setupSignalHandlers(app?: any): void {
    //When stopping server via Ctrl+C
    process.on('SIGINT', () => ShutdownHandler.gracefulShutdown('SIGINT', app));   // Ctrl+C
    // When deployment stops
    process.on('SIGTERM', () => ShutdownHandler.gracefulShutdown('SIGTERM', app)); // Docker/PM2 stop
    // When development restarts
    process.on('SIGUSR2', () => ShutdownHandler.gracefulShutdown('SIGUSR2', app)); // Nodemon restart

    // Handle uncaught exceptions
    process.on('uncaughtException', async (error) => {
      console.error('Uncaught Exception:', error);
      await ShutdownHandler.gracefulShutdown('uncaughtException', app);
    });

    process.on('unhandledRejection', async (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      await ShutdownHandler.gracefulShutdown('unhandledRejection', app);
    });

    console.log('Shutdown handlers registered');
  }
}