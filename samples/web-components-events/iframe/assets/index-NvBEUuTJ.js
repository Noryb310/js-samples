(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */async function s(){await google.maps.importLibrary("maps"),await google.maps.importLibrary("marker"),console.log("Maps JavaScript API loaded.");const n=document.querySelectorAll("#marker-click-event-example gmp-advanced-marker");for(const t of n)customElements.whenDefined(t.localName).then(async()=>{t.addEventListener("gmp-click",async()=>{new google.maps.InfoWindow({content:t.title}).open({anchor:t})})})}s();
