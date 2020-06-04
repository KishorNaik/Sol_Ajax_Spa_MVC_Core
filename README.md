# Single Page application in Asp.net core (Spa MVC Core)
Better approach to turn an ASP.NET Core Application Into Single Page Application using Ajax methodology.
The main motto is to reduce developer's effort while working on creating a SPA and 
enhancing the Web app performance both on server and client side.

#### Key Point
* No need to write Jquery code to make single page application.
* The Ajax Spa library has ajax function inbuilt which will be called automatically.
* Use default server side routing.
* Developer can also use other javascript framework side by side.

#### Note
This library will apply on Asp.net core 3.1 solution.

## Setup

### Step 1:
Install following nuget package in your solution.
[![Generic badge](https://img.shields.io/badge/Nuget-1.0.1-<COLOR>.svg)](https://www.nuget.org/packages/AjaxSpaMvcCore/1.0.1)

#### Using Nuget Package Manger:
```
PM> Install-Package AjaxSpaMvcCore -Version 1.0.1
```

#### Using .Net CLI:
```
> dotnet add package AjaxSpaMvcCore --version 1.0.1
```


### Step 2:
Go to **Startup.cs** file, Add the following middleware on **Configure** Method.
```C#
app.UseAjaxSpa();
```

### Step 3:
Add the Ajax spa Tag helper referance on **_ViewImports.cshtml** file inside the View folder.
```C#
@addTagHelper *,AjaxSpaMvcCore
```
**Note:** Build the solution. 

### Step 4:
Go to **_Layout.cshtml** file, do the following process.
1. Add the following client side referance before the closing body tag
```html
<script src="~/AjaxSpaResource/js/core.js"></script>
<script src="~/AjaxSpaResource/js/spa.js"></script>
```
2. Replace **RenderBody()** method with following ajax spa tag helper, like this
```razor
<main role="main" class="pb-3">
    @*@RenderBody()*@
    <ajax-spa render-body="@RenderBody()"></ajax-spa>
 </main>
```
### Step 5:
Apply layout page by using **ApplyLayoutAsync()** extension method in the **_ViewStart.cshtml** file.
```razor
@using AjaxSpaMvcCore
@{
    //Layout = "_Layout";
    Layout = await Context.Request.ApplyLayoutAsync("~/Views/Shared/_Layout.cshtml");
}

```

#### Build the solution and launch web app on browser. You will get notice that your child views not refresh in the browser.
#### We convert whole Asp.net core MVC solution into Single Page Application using this library. 

