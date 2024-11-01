// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: {
        COUNTER: DurableObjectNamespace;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: CacheStorage & { default: Cache };
    }
    interface Post {
      title: string;
      slug: string;
      description: string;
      date: string;
      updated: string;
      categories: string[];
      published: boolean;
    }
  }
}

export { };
