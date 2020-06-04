using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AjaxSpaMvcCore.Middlewares
{
    public static class AjaxSpaApplicationBuilder
    {
        public static void UseAjaxSpa(this IApplicationBuilder app)
        {
            var embeddedProvider =
                    new EmbeddedFileProvider(typeof(AjaxSpaMvcCore.AjaxSpaRequestHandlerExtension)
                    .Assembly, "AjaxSpaMvcCore.Resources");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = embeddedProvider,
                RequestPath = "/AjaxSpaResource"
            });

        }
    }
}
