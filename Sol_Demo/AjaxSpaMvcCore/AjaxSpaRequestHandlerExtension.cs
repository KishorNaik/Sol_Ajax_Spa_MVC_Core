using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Razor;

namespace AjaxSpaMvcCore
{
    public static class AjaxSpaRequestHandlerExtension
    {
        public static Task<String> ApplyLayoutAsync(this HttpRequest httpRequest,String layoutPath)
        {
            string layout = null;
            if(httpRequest.Headers["x-requested-with"] == "XMLHttpRequest")
            {
                layout = layoutPath;
            }
            else
            {
                layout = layoutPath;
            }

            return Task.FromResult<String>(layout);
        }
    }
}
