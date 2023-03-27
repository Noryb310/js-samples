(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */let i,d,a;async function c(){await Promise.all([google.maps.importLibrary("marker"),google.maps.importLibrary("places")]),i=new google.maps.Map(document.getElementById("map"),{center:{lat:40.749933,lng:-73.98633},zoom:13,mapId:"4504f8b37365c3d0",mapTypeControl:!1});const r=document.createElement("input");r.id="pac-input";const n=new google.maps.places.PlaceAutocompleteElement({inputElement:r}),s=document.getElementById("pac-card");s.appendChild(n.element),i.controls[google.maps.ControlPosition.TOP_LEFT].push(s),d=new google.maps.marker.AdvancedMarkerView({map:i}),a=new google.maps.InfoWindow({}),n.addListener("gmp-placeselect",async({place:t})=>{await t.fetchFields({fields:["displayName","formattedAddress","location"]}),t.viewport?i.fitBounds(t.viewport):(i.setCenter(t.location),i.setZoom(17));let e='<div id="infowindow-content"><span id="place-displayname" class="title">'+t.displayName+'</span><br /><span id="place-address">'+t.formattedAddress+"</span></div>";p(e,t.location),d.position=t.location})}function p(r,n){a.setContent(r),a.setPosition(n),a.open({map:i,anchor:d,shouldFocus:!1})}c();
