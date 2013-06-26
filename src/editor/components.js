(function($, undefined) {

var kendo = window.kendo,
    DropDownList = kendo.ui.DropDownList,
    dom = kendo.ui.editor.Dom;

var SelectBox = DropDownList.extend({
    init: function(element, options) {
        var that = this;

        DropDownList.fn.init.call(that, element, options);

        that.value(that.options.title);

        that.bind("open", function() {
            if (that.options.autoSize) {
                var list = that.list;

                list.css({
                        whiteSpace: "nowrap",
                        width: "auto"
                    });

                that._width = list.width() || that._width;

                list.css("width", that._width + kendo.support.scrollbar());
            }
        });
    },
    options: {
        name: "SelectBox"
    },
    value: function(value) {
        var that = this,
            result = DropDownList.fn.value.call(that, value);

        if (value === undefined) {
            return result;
        }

        if (value !== DropDownList.fn.value.call(that)) {
           that.text(that.options.title);

           if (that._current) {
               that._current.removeClass("k-state-selected");
           }

           that.current(null);
           that._oldIndex = that.selectedIndex = -1;
        }
    },

    decorate: function(doc) {
        var items = this.dataSource.data(),
            i, tag, className;

        for (i = 0; i < items.length; i++) {
            tag = items[i].tag || "span";
            className = items[i].className;

            items[i].style = dom.inlineStyle(doc, tag, { className : className }) + ";display:inline-block";
        }

        this.dataSource.trigger("change");
    }
});


kendo.ui.plugin(SelectBox);
kendo.ui.editor.SelectBox = SelectBox;

})(window.kendo.jQuery);
