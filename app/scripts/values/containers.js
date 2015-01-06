'use strict';

/**
 * @ngdoc service
 * @name transcripticApp.containers
 * @description
 * # containers
 * Constant in the transcripticApp.
 */
angular.module('transcripticApp').constant('ContainerOptions', {
  "384-flat": {
    name: "384-well UV flat-bottom plate",
    well_count: 384,
    well_type: null,
    well_depth_mm: null,
    well_volume_ul: 112.0,
    well_coating: null,
    sterile: false,
    is_tube: false,
    capabilities: ["spin", "incubate", "absorbance",  "fluorescence", "luminescence"],
    shortname: "384-flat",
    col_count: 24
  },
  "384-pcr": {
    name: "384-well PCR plate",
    well_count: 384,
    well_type: null,
    well_depth_mm: null,
    well_volume_ul: 50.0,
    well_coating: null,
    sterile: null,
    is_tube: false,
    capabilities: ["thermocycle", "spin", "incubate"],
    shortname: "384-pcr",
    col_count: 24
  },
  "96-flat": {
    name: "96-well flat-bottom plate",
    well_count: 96,
    well_type: null,
    well_depth_mm: null,
    well_volume_ul: 360.0,
    well_coating: null,
    sterile: false,
    is_tube: false,
    capabilities: ["spin", "incubate", "absorbance", "fluorescence", "luminescence"],
    shortname: "96-flat",
    col_count: 12
  },
  "96-pcr": {
    name: "96-well PCR plate",
    well_count: 96,
    well_type: null,
    well_depth_mm: null,
    well_volume_ul: null,
    well_coating: null,
    sterile: null,
    is_tube: false,
    capabilities: ["thermocycle", "spin", "incubate"],
    shortname: "96-pcr",
    col_count: 12
  },
  "96-deep": {
    name: "96-well extended capacity plate",
    well_count: 96,
    well_type: null,
    well_depth_mm: null,
    well_volume_ul: 2000.0,
    well_coating: null,
    sterile: false,
    capabilities: ["incubate"],
    shortname: "96-deep",
    is_tube: false,
    col_count: 12
  },
  "micro-2.0": {
    name: "2mL Microcentrifuge tube",
    well_count: 1,
    well_type: null,
    well_depth_mm: null,
    well_volume_ul: 2000.0,
    well_coating: null,
    sterile: false,
    capabilities: ["spin", "incubate"],
    shortname: "micro-2.0",
    is_tube: true,
    col_count: 1
  },
  "micro-1.5": {
    name: "1.5mL Microcentrifuge tube",
    well_count: 1,
    well_type: null,
    well_depth_mm: null,
    well_volume_ul: 1500.0,
    well_coating: null,
    sterile: false,
    capabilities: ["spin", "incubate"],
    shortname: "micro-1.5",
    is_tube: true,
    col_count: 1
  }
});
