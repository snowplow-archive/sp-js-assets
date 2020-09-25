/* 
 * Copyright (c) 2012 SnowPlow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
 
/**
 * Holds helper functions to work with the
 * QuBIT OpenTag's Universal Variable.
 *
 * For details see:
 * * https://github.com/QubitProducts/UniversalVariable
 * * https://github.com/snowplow/snowplow/wiki/Integrating-Javascript-tags-with-QuBIT-OpenTag
 */
var uvHelpers = (function() {
 
  // Private variables
  var pub = {},
      otEvent = document.createEvent('Event');
  
  // To identify all events to listen for in OpenTag
  otEvent.initEvent('OpenTagEvent', true, true);
 
  /**
   * Tracks a structured event in QuBIT OpenTag's
   * Universal Variable.
   *
   * Compatible with Google Analytics and SnowPlow.
   *
   * @param string category The name you supply for
   *        the group of objects you want to track
   * @param string action A string that is uniquely
   *        paired with each category, and commonly
   *        used to define the type of user
   *        interaction for the web object
   * @param string label An optional string
   *        to provide additional dimensions to the
   *        event data
   * @param string property An optional string
   *        describing the object or the action
   *        performed on it. This might be the
   *        quantity of an item added to basket
   * @param int|float|string value An integer that
   *        you can use to provide numerical data
   *        about the user event
   */
  pub.trackStructEvent = function(category, action, label, property, value) {
 
    // Safe initialization
    window.universal_variable = window.universal_variable || {};
    window.universal_variable.events = window.universal_variable.events || [];
    
    // Push the event
    window.universal_variable.events.push({
      // Standard UV fields - see: https://github.com/QubitProducts/UniversalVariable
      'type': 'struct',
      'time': null,
      'cause': null,
      'effect': null,
      // Extension for GA/SP structured events
      'category': category,
      'action': action,
      'label': label,
      'property': property,
      'value': value});
 
    // Notify OpenTag
    window.dispatchEvent(otEvent);
  };
 
  /**
   * Tracks an unstructured event in QuBIT OpenTag's
   * Universal Variable.
   *
   * Compatible with MixPanel, KISSmetrics et al.
   *
   * @param string name A string which identifies
   *        the type of event
   * @param object properties An arbitrary,
   *        unstructured JSON envelope containing all
   *        properties relating to this event
   */
  pub.trackUnstructEvent = function(name, properties) {
 
    // Safe initialization
    window.universal_variable = window.universal_variable || {};
    window.universal_variable.events = window.universal_variable.events || [];
    
    // Push the event
    window.universal_variable.events.push({
      // Standard UV fields - see: https://github.com/QubitProducts/UniversalVariable
      'type': 'unstruct',
      'time': null,
      'cause': null,
      'effect': null,
      // Extension for MX/KS/etc unstructured events
      'name': name,
      'properties': properties});
  
    // Notify OpenTag
    window.dispatchEvent(otEvent);
  };
 
  return pub; // Only the two functions are public.
}());