"use client";
import { useEffect } from 'react';

export function useFocusTrap(active: boolean, container: React.RefObject<HTMLElement | null>, onEscape?: ()=>void){
  useEffect(()=>{
    if(!active) return;
    const el = container.current;
    const prev = document.activeElement as HTMLElement | null;
    function getFocusable(){
      if(!el) return [] as HTMLElement[];
      return Array.from(el.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
      ));
    }
    const focusables = getFocusable();
    focusables[0]?.focus();
    function onKey(e: KeyboardEvent){
      if(e.key==='Escape'){ onEscape && onEscape(); }
      if(e.key==='Tab'){
        const items = getFocusable(); if(items.length===0) return;
        const first = items[0]; const last = items[items.length-1];
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [active, container, onEscape]);
}
