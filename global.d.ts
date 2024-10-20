// global.d.ts
declare global {
  var mongoose: {
    conn: any | null;
    promise: any | null;
  };
}

export {};
