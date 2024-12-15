import { Hono } from "hono";

/**
 * Base router class with dynamic controller(T) to be used to apply routes in the parent module
 */
export abstract class BaseRouter<T> {
  // hono router to be used in parent module for routing
  protected router: Hono;
  constructor(
    protected readonly controller: T,
  ) {
    this.router = new Hono();
    this.initRoutes();
  }

  /**
   * Defines all routes for the parent module
   */
  protected abstract initRoutes(): void;

  /**
   * Return express router defined with module routes
   */
  getRouter(): Hono {
    return this.router;
  }
}