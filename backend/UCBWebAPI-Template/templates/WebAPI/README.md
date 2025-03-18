# Ucb WebApi template provides a simple way to create a web api using the UCB framework

## By default it installs project structure as follows

### Core
#### Depsit.Application
- Common
- Features
- Repositories

#### Depsit.Domain 
- Common
- Entities

### Infrastructure
#### Depsit.Persistence
- Common
- Context
- Infrastructure
- Migrations
- Repositories

### WebAPi
#### Depsit.WebAPi
- Common
- Controllers
- Extensions
- Properties

# Instructions

## Prerequisites

- An app registered in Azure portal with Client and Tenant IDs
- Access to the UCB Azure DevOps
- Stable network connection
- .NET SDK

### 1. Download the package from the depsit artifact feed

### 2.1 Install the downloaded package 
	
	dotnet new install "path_to_your_package"

For example:

	dotnet new install "C:\Users\U111111\Downloads\Kickstart.Template.Backend.1.0.15.nupkg"


#### 2.2 Verify by running

    dotnet new --list

You should see the kickstart template between iOS and Mac Catalyst

For example:

```
iOS View Controller          ios-viewcontroller          [C#]        iOS/Mobile                                                                    
Kickstart.Template           kickstart-template          [C#]        WebApi/Layered architecture/Depsit/EFC                                        
Mac Catalyst Application     maccatalyst                 [C#],VB     macOS/Mac Catalyst
```

### 3. Navigate to the directory where you want to create the project
For example: 

	cd C:\temp

### 4. Create a new project using the template

	dotnet new kickstart-template

### 5. Open in VS and enter Client ID and Tenant ID into appsettings.json in WebAPi/Depsit.WebAPi
For example:

	cd C:/temp/kickstart-template
then

	code . 

### 6. Build the project using

	dotnet build

## 7. Optional - Database

### 7.1 Navigate to the Persistence project 

	cd .\Infrastructure\Depsit.Persitence\

### 7.2 Run the following commands to create the database

	dotnet ef migrations add InitialCreate

then 

	dotnet ef database update

# Usage

## For local development

If you have a new version of the Kickstart Template and want to test it locally using dotnet new command

### 1. Increment the version in Kickstart.Template.Backend.nuspec file

### 2. Build the project using

	dotnet build 

### 3. Create nupkgs folder that contains every .csproj file in the solution using

	dotnet pack -o ./nupkgs

### 4. Pack the project using 

	nuget pack Kickstart.Template.Backend.nuspec

This will create a .nupkg file in the root directory that is ready to be pushed to the feed or for to install locally

### 5. Navigate to the directory where you want to create the project
For example: 

	cd C:\temp

### 6. Run the following commands to install the package locally

	dotnet new install "/path_to_your_package/_Kickstart.Template.Backend.<version>.nupkg"  
	
For example:

	dotnet new install "C:\Users\U111111\source\repos\Kickstart_Template\backend\UCBWebAPI-Template\templates\WebAPI\Kickstart.Template.Backend.1.0.15.nupkg"  

If you installed the Kickstart Template before, this command will uninstall it. 

	dotnet new uninstall Kickstart.Template.Backend  

Then install it again as shown in step 6

### 7. Create a new project using the template

	dotnet new kickstart-template
	
## Publishing to the ucb azure devops artifacts feed

### 1. Repeat steps 1-4 from the local development section

### 2. Publish to the feed using 

	nuget.exe push -Source "https://dev.azure.com/ucbalm/DEPSIT/_artifacts/feed/depsit" -ApiKey az "\folder_where you_have_the_nupkg"

Feed is already defined in nuget config file so the command would be for example: 

	nuget.exe push -Source "depsit" -ApiKey az "C:\Users\U111111\source\repos\Kickstart_Template\backend\UCBWebAPI-Template\templates\WebAPI\"

Might be possible that you have to increment the versions in .csproj files as well before running the dotnet build command

## Tests 

### 1. Run the tests using

	dotnet test	