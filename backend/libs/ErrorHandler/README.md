# Error Handler is a C# .NET project used for handling custom exceptions and maps them to appropriate HTTP status codes in an ASP.NET Core applications

## It allows you to

- Customise exception handling
- Map HTTP status codes

# Instructions

## Prerequisites

- .NET Core SDK

### 1. Use the library by referencing the package in .csproj file

    <PackageReference Include="ErrorHandler" Version="<version>" />

### 2. Run

    dotnet restore

## Example endpoint

Program.cs contains example endpoint available at <port>/throw
