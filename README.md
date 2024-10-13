# React State Management System

This document outlines the architecture and usage of a custom state management system developed for a React application. This system uses a combination of React states, a web worker, and a subscription model to manage and propagate state updates efficiently across components.

## System Overview

The state management system consists of the following components:

- **State Modules**: Defines separate state objects for different parts of the application.
- **Mutate Function**: Handles immutable state updates.
- **StateWebWorker and Listener**: Offloads processing from the main thread using web workers.
- **State Service**: Manages subscriptions and state updates, and communicates with the web worker.

## Setup

### State Modules

State objects for different components are set up in separate files:

- `appState`: Manages state related to the overall application.
- `componentAState`: Manages state specific to ComponentA.
- `componentBState`: Manages state specific to ComponentB.

Each state object is defined and exported from its respective module.

### Mutate Function

The `mutate` function is responsible for creating new state objects based on provided changes, ensuring state immutability:

```typescript
const mutate = (state: any, keys: Array<{ key: string, value?: any }>) => {
    let newState = {...state};
    keys.forEach(({ key, value }) => {
        newState[key] = value !== undefined ? value : !newState[key];
    });
    return newState;
};
# ReactAsyncStateManagementWithWebworker
# pong-client
