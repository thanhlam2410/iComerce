import express from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMockRequest = (input: { [key: string]: any }) => {
  return {
    ...input
  } as express.Request;
};
