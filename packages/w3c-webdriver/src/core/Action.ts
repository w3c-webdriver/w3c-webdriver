// tslint:disable: no-reserved-keywords
import { Element } from "../Element";

export type PauseAction = {
  type: 'pause';
  duration: number;
};

export type KeyDownAction = {
  type: 'keyDown';
  value: string;
};

export type KeyUpAction = {
  type: 'keyUp';
  value: string;
}

export type PointerMoveAction = {
  type: 'pointerMove';
  x: number;
  y: number;
  duration?: number;
  origin?: 'viewport' | 'pointer' | Element;
};

export type PointerUpAction = {
  type: 'pointerUp';
  button: number;
};

export type PointerDownAction = {
  type: 'pointerDown';
  button: number;
};

export type NullAction = PauseAction;

export type KeyAction = PauseAction | KeyDownAction | KeyUpAction;

export type PointerAction = PauseAction | PointerMoveAction | PointerUpAction | PointerDownAction;

export type NullActionSequence = {
  type: 'none';
  id: string;
  actions: NullAction[];
};

export type KeyActionSequence = {
  type: 'key';
  id: string;
  actions: KeyAction[];
};

export type PointerParameters = {
  pointerType: 'mouse' | 'pen' | 'touch';
};

export type PointerActionSequence = {
  type: 'pointer';
  id: string;
  actions: PointerAction[];
  parameters?: PointerParameters;
};

export type ActionSequence = NullActionSequence | KeyActionSequence | PointerActionSequence;
