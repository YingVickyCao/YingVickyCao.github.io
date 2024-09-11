# App_Architecture


Business logic : data layer  / domain layer  
UI behavour laer or UI logic : UI layer.  


# UI layer
UI layer : display data on screen


## UI elements
UI elements : render data on the screen

## State holders

State holders: hold data, expose it to UI , and handle logic.

Expose the UI state in an observable data holder like LiveData or StateFlow.

- ViewModel
- viewModelScope
- mutableStateOf
- snapshotFlow
- MutableStateFlow
- StateFlow or LiveData
- lifecycleScope

# Domain layer
The domain layer is an optional layer that sits between the UI and data layers.  

The domain layer is responsible for encapsulating complex business logic, or simple business logic that is reused by multiple ViewModels.

## Uase case
Classes in this layer are commonly called use cases or interactors. Each use case should have responsibility over a single functionality.



# Data layer

- Data layer : business logic and exposes data.

- The business logic is what gives value to your app—it's made of rules that determine how your app creates, stores, and changes data.

- The data layer is made of repositories that each can contain zero to many data sources. You should create a repository class for each different type of data you handle in your app.

## Repository

- Repository classes are responsible for the following tasks:  
Exposing data to the rest of the app.    
Centralizing changes to the data.    
Resolving conflicts between multiple data sources.    
Abstracting sources of data from the rest of the app.    
Containing business logic.    

## Data source

Each data source class should have the responsibility of working with only one source of data, which can be a file, a network source, or a local database. 
