---
name: map-crafting
description: >-
    Generic cartographic design standards for thematic, choropleth, facility-location,
    and bivariate maps. Enforces composable layer pipelines, domain filtering and
    neutral gray masking, colorblind-safe palettes with high-contrast hydrography,
    distribution-aware binning, non-overlapping two-zone legend layouts, and test
    output isolation. Activate whenever creating, refactoring, or reviewing spatial
    map generators and cartographic figures.
license: MIT
metadata:
  author: zaymuel
  category: geospatial
  tags: cartography, gis, choropleth, bivariate, matplotlib, colorblind-safe, spatial
---

# Map Crafting: Thematic & Bivariate Cartography Standards

## When to Use

Activate this skill whenever creating, modifying, or reviewing spatial visualizations, choropleth maps, bivariate supply-demand maps, or point-location maps in any geospatial pipeline.

## Core Cartographic Directives

1. **SHARED CANVAS, METRIC PROJECTION & AUTHORITATIVE OUTER BOUNDARY**
    - **Composable Layer Architecture**: Structure map generators around modular layer steps (canvas initialization, spatial projection/orientation, neutral base layer, authoritative outer boundary, physical context/hydrography, thematic choropleth or point layer, contextual feature legend, and layout finalization) rather than duplicating plotting boilerplate across functions.
    - **Metric Projected CRS & Configurable Orientation**: Project all spatial layers to an appropriate local metric CRS before computing areas, bounding boxes, or scale bars. When a study area's geometry benefits from canvas rotation, apply an optional, configurable rotation angle around a shared reference centroid consistently across all spatial layers and the North arrow.
    - **Full Polygon Opacity (`alpha=1.0`)**: Render thematic choropleth polygons at `alpha=1.0` so polygon fills on the map canvas match the legend and colorbar swatches identically without background bleed-through.
    - **Authoritative Study-Area Boundary**: Overlay a distinct outer boundary (`edgecolor="#222222"`, `linewidth=1.0`, `facecolor="none"`) dissolved from the official administrative boundary dataset, even when the thematic layer uses synthetic tessellations (such as hexagonal grids or raster cells) whose outer hull would otherwise appear jagged.

2. **DOMAIN FILTERING CRITERIA & EXCLUDED-UNIT MASKING**
    - **Filter-to-`NaN`, Never Impute Zero**: Spatial units that fail domain eligibility or minimum-denominator filtering criteria (such as uninhabited units, zero target-subpopulation denominator, or observations below a minimum exposure threshold) must be masked to `NaN` rather than coerced to `0`.
    - **Neutral Gray Rendering (`missing_kwds`)**: Render masked or excluded polygons via `missing_kwds` (or an underlying neutral base layer) in light neutral gray (`facecolor="#e5e7eb"`, `edgecolor="#999999"`), never in the lowest thematic bin color (such as red), keeping excluded or zero-exposure units visually distinct from low-performing units.

3. **COLORBLIND-SAFE PALETTES, REDUNDANT ENCODING & HIGH-CONTRAST CONTEXTUAL LAYERS**
    - **Luminance-First Default (`colorblind: bool = True`) & Case-by-Case Palette Selection**: Prioritize perceptually uniform luminance (monotonic dark-to-light progression) first and colorblind-safe hues second, preserving the blue-yellow axis for red-green color vision deficiency (CVD). Default all thematic maps to `colorblind: bool = True` (with an explicit CLI opt-out such as `--no-colorblind`). Before implementing a map, identify the data type and present the matching palette options for the user to choose (or expose a configurable `palette` parameter):
        - **Sequential** (accessibility scores, travel times, density):
            1. `cividis` (default: dark blue to yellow, engineered for red-green CVD).
            2. `viridis`, `magma`, or `inferno` (perceptually uniform, grayscale-safe).
            3. ColorBrewer `Blues` (single-hue minimal fallback).
        - **Diverging** (gains vs. losses, deviation from a baseline):
            1. Blue-to-Orange or ColorBrewer `PuOr` (Purple-to-Orange; safest across CVD severities).
            2. `RdBu` or `RdYlBu` (blue for favorable/high tiers, orange/red for critical/low tiers).
            3. ColorBrewer `BrBG` (Brown-to-Blue-Green).
            - Never use `RdYlGn` or red-green diverging ramps.
        - **Categorical** (transit lines, zones, discrete classes):
            1. Okabe-Ito 8-color palette (blue, sky blue, orange, vermilion, bluish green, yellow, reddish purple, black).
            2. Paul Tol palettes (`Bright`, `Muted`, `High-Contrast`).
    - **Redundant Visual Encoding**: Never rely on color alone for critical distinctions. Pair hues with line styles (solid, dashed, dotted), marker shapes, hatching patterns, or direct labels.
    - **Neutral Desaturated Basemaps**: Keep any underlying basemap or contextual canvas desaturated (light gray or dark gray) so background colors never interfere with the thematic palette.
    - **Non-Conflicting Contextual Layers & Micro-Feature Filtering**: Centralize palette definitions and style contextual uninhabitable layers (such as hydrography/water bodies or barriers) uniformly in the same neutral gray as uninhabited areas (`facecolor="#e5e7eb"`, `edgecolor="#6b7280"`) paired with diagonal hatching (`hatch="////"`) across all maps so they never add competing hues or collide with thematic bins or facility point markers. Filter out sub-scale contextual polygons below a scale-appropriate minimum area threshold (for example, `< 0.5 km²` on regional maps) so tiny polygons such as micro-ponds are never mistaken for point markers.
    - **Grayscale & CVD Verification**: Verify final map legibility in grayscale (or with a CVD simulator such as DaltonLens or Coblis) to confirm that luminance hierarchy remains clear without relying on hue.

4. **DISTRIBUTION-AWARE BINNING & BIVARIATE CLASSIFICATION**
    - **Quantiles / Deciles (`D1`..`D10`)**: Use for continuous socio-economic indices or normalized rankings.
    - **Zero-Aware Quantile Bins**: For continuous scores with a point mass at zero (such as catchment ratios, gravity scores, or cumulative opportunities), isolate `0` (or values below a domain threshold) as an explicit bottom category and partition strictly positive observations into quantile bins (`Q1`..`Q4`).
    - **Magnitude / Logarithmic Categorical Bins**: For heavy-tailed count or population distributions, use explicit human-readable magnitude brackets rather than unbinned linear ramps.
    - **3x3 Bivariate Choropleth Matrix**: When evaluating two spatial distributions jointly (such as service supply/accessibility vs. demand density), apply domain filtering criteria first, classify each variable into tertiles (Low, Medium, High), and map the 9 joint states through an orthogonal 3x3 colorblind-safe matrix.

5. **TWO-ZONE NON-OVERLAPPING LEGEND ARCHITECTURE**
    - **Contextual Feature Legend**: Include a dedicated feature legend in a non-overlapping lower position (preferring `loc="lower right"` or `loc="lower center"`, suppressed only when `no_annotations=True`) listing all non-thematic spatial layers present on the canvas (hydrography/water bodies, masked units excluded by filtering criteria, and point facility tiers).
    - **Dedicated Thematic Legend Band**: Reserve a dedicated margin outside the geographic bounding box (such as a bottom margin band) for the primary thematic legend (either a horizontal colorbar/patch bar or a 3x3 bivariate matrix inset with orthogonal axis labels and directional arrows), ensuring legends never cover map polygons.

6. **UNIFIED CARTOGRAPHIC FURNITURE & CLEAN EXPORT TOGGLE**
    - Finalize every figure with consistent cartographic furniture: hierarchical title and subtitle, metric scale bar, orientation-aware North arrow, and data-source/methodology caption.
    - Provide a `no_annotations: bool = False` toggle across all map generators to cleanly strip titles, captions, scale bars, North arrows, and legends when exporting bare canvases for publication layouts.

7. **OUTPUT DIRECTORY HYGIENE & TEST ISOLATION**
    - Group multi-metric or batch map families into dedicated subdirectories (e.g., `maps/accessibility_measures/`) to keep top-level figure directories concise.
    - Require an explicit `output_path` parameter on every plotting function and restrict automated tests to writing exclusively inside temporary test directories (`tmp_path`), never mutating production result folders.

## Pre-Flight Review Checklist

Verify all 7 items on every new or updated map generator:

- [ ] **Shared Canvas, Metric CRS & Outer Boundary:** Projects layers to a local metric CRS with optional centroid rotation, sets `alpha=1.0` on choropleth polygons, and overlays the dissolved authoritative study-area boundary.
- [ ] **Domain Filtering & Neutral Gray Masking:** Masks units failing domain filtering criteria to `NaN` and renders them in neutral gray (`#e5e7eb`, edge `#999999`), never as `0` or the lowest data bin color.
- [ ] **Case-Appropriate Colorblind-Safe Palette & Non-Conflicting Contextual Layers:** Defaults to `colorblind: bool = True`, offers the matching luminance-first palette menu by data type (Sequential, Diverging, Categorical, or 3x3 Bivariate) for case-by-case selection, avoids `RdYlGn`, keeps basemaps desaturated, styles water bodies/uninhabitable contextual layers uniformly in uninhabited neutral gray (`#e5e7eb` fill, `#6b7280` edge) with diagonal hatching (`hatch="////"`), and filters sub-scale micro-polygons so they never blend into thematic bins or point markers.
- [ ] **Contextual Feature Legend:** Displays a dedicated feature legend for water bodies, excluded/masked areas, and point layers whenever `no_annotations=False`.
- [ ] **Non-Overlapping Thematic Legend Band:** Places the colorbar, categorical patch bar, or 3x3 bivariate inset in a dedicated margin band outside the study-area polygons.
- [ ] **Unified Cartographic Furniture & Test Isolation:** Includes title, subtitle, metric scale bar, North arrow, and source footer (all toggleable via `no_annotations`), and writes test outputs strictly to `tmp_path`.
- [ ] **Redundant Encoding & Grayscale Check:** Pairs color with secondary visual cues (line styles, shapes, hatching, or labels) for critical distinctions, and confirms visual hierarchy holds up in grayscale or a CVD simulator.