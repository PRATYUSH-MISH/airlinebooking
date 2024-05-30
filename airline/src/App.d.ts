// App.d.ts
import React from 'react';

declare module './App' {
  export default class App extends React.Component<Record<string, never>, Record<string, never>> {}
}