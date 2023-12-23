using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//-------------------------------------
// Add services to the container.
//-------------------------------------

builder.Services.AddControllers();

// move all setup to extensions class.
builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

//-------------------------------------
// Configure the HTTP request pipeline.
//-------------------------------------

// Server error 500 handler for custom format
// custom middleware if there is a server error catch.
// can organize the server error response to client.
app.UseMiddleware<ExceptionMiddleware>();

// page not found 404, redirect to page that we can control
// redirect the unknown page request to our error handler controller.
// put it at top of pipeline.
app.UseStatusCodePagesWithReExecute("/errors/{0}");

// default swagger is open in development mode only
// if we want to open inside production, just remove development env
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
app.UseSwagger();
app.UseSwaggerUI();

// declaration of using static file, for example image inside project.
// wwwroot/images/products/.. -> browse at localhost/images/products/..
app.UseStaticFiles();

app.UseHttpsRedirection();

// to allow which domain that we allow to access.
// this cors is setup inside applicationservicesExtension.
// put cors before Authorization
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

#region EF things - Auto update pending migration and seed

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var identityContext = services.GetRequiredService<AppIdentityDbContext>();
var userManager = services.GetRequiredService<UserManager<AppUser>>();
var logger = services.GetRequiredService<ILogger<Program>>();
try
{
    // auto update pending migration
    await context.Database.MigrateAsync();
    await identityContext.Database.MigrateAsync();

    // auto run seed file
    await StoreContextSeed.SeedAsync(context);
    await AppIdentityDbContextSeed.SeedUsersAsync(userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "An Error occured during migration");
}

#endregion


app.Run();
