# Property Fetching Guide

This guide outlines the various ways to fetch and handle property data in the RCR application.

## Table of Contents
- [Basic Property Fetching](#basic-property-fetching)
- [Detailed Property with Relationships](#detailed-property-with-relationships)
- [Filtering and Search](#filtering-and-search)
- [API Endpoints Structure](#api-endpoints-structure)
- [Media Handling](#media-handling)
- [Resource Transformers](#resource-transformers)
- [Frontend API Calls](#frontend-api-calls)
- [Best Practices](#best-practices)

## Basic Property Fetching

```php
// In your PropertyController
public function index() {
    // Basic fetch of all properties
    $properties = Property::all();
    
    // With pagination
    $properties = Property::paginate(10);
    
    // With specific type filter
    $properties = Property::where('type', 'residential')->get();
}
```

## Detailed Property with Relationships

```php
// Single property with all relationships
public function show($id) {
    $property = Property::with([
        'amenities',
        'media',
        'agent',
        'tours'
    ])->findOrFail($id);
}
```

## Filtering and Search

```php
public function search(Request $request) {
    $query = Property::query();
    
    if ($request->has('type')) {
        $query->where('type', $request->type);
    }
    
    if ($request->has('price_min')) {
        $query->where('price', '>=', $request->price_min);
    }
    
    if ($request->has('price_max')) {
        $query->where('price', '<=', $request->price_max);
    }
    
    // For JSONB fields (like media)
    if ($request->has('has_video')) {
        $query->whereJsonLength('media->videos', '>', 0);
    }
    
    return $query->paginate(15);
}
```

## API Endpoints Structure

```php
// In your routes/api.php
Route::prefix('properties')->group(function () {
    Route::get('/', 'PropertyController@index');
    Route::get('/search', 'PropertyController@search');
    Route::get('/{id}', 'PropertyController@show');
    Route::get('/{id}/media', 'PropertyController@media');
    Route::get('/{id}/tours', 'PropertyController@tours');
});
```

## Media Handling

```php
public function media($propertyId) {
    $property = Property::findOrFail($propertyId);
    
    // Access JSONB media field
    $media = $property->media;
    
    return [
        'images' => $media['images'] ?? [],
        'videos' => $media['videos'] ?? [],
        'virtualTours' => $media['virtualTours'] ?? []
    ];
}
```

## Resource Transformers

```php
class PropertyResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'features' => $this->features,
            'media' => $this->media,
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
            'agent' => new UserResource($this->whenLoaded('agent')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
```

## Frontend API Calls

```javascript
// Using axios or fetch
const fetchProperties = async (filters = {}) => {
    const response = await axios.get('/api/properties', { params: filters });
    return response.data;
};

const fetchPropertyDetail = async (id) => {
    const response = await axios.get(`/api/properties/${id}`);
    return response.data;
};
```

## Best Practices

### Caching
```php
// Example caching implementation
$properties = Cache::remember('featured_properties', 3600, function () {
    return Property::featured()->get();
});
```

### Error Handling
```php
try {
    $property = Property::findOrFail($id);
} catch (ModelNotFoundException $e) {
    return response()->json([
        'error' => 'Property not found'
    ], 404);
}
```

### Authorization
```php
public function show($id) {
    $property = Property::findOrFail($id);
    
    $this->authorize('view', $property);
    // or
    if (Gate::denies('view-property', $property)) {
        abort(403);
    }
    
    return new PropertyResource($property);
}
```

### Validation
```php
public function search(Request $request) {
    $validated = $request->validate([
        'type' => 'nullable|in:residential,commercial,land',
        'price_min' => 'nullable|numeric',
        'price_max' => 'nullable|numeric|gt:price_min',
        'location' => 'nullable|string'
    ]);
    
    // Proceed with query...
}
``` 