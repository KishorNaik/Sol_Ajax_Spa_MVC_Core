using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace AjaxSpaMvcCore.TagHelpers
{
    // You may need to install the Microsoft.AspNetCore.Razor.Runtime package into your project
    [HtmlTargetElement("ajax-spa")]
    public class RenderBodyRazorTagHelper : TagHelper
    {
        private readonly IHtmlHelper htmlHelper = null;
        private const string RenderBodyAttributeName = "render-body";

        public RenderBodyRazorTagHelper(IHtmlHelper htmlHelper)
        {
            this.htmlHelper = htmlHelper;
        }

        [HtmlAttributeName(RenderBodyAttributeName)]
        public IHtmlContent AjaxRenderBody { get; set; }

        [HtmlAttributeNotBound]
        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public async override Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {

            //Contextualize the html helper
            (htmlHelper as IViewContextAware).Contextualize(ViewContext);


            var content = await htmlHelper?.PartialAsync("~/TagHelpers/_RenderBodyPartialView.cshtml",this);

            output.Content.SetHtmlContent(content);

            //return base.ProcessAsync(context, output);
        }
    }
}
