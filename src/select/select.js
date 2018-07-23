var selectTmpl = jQuery('#ejs-select').html();

/**
 * 自定义下拉框
 */
function SelectBox(config) {
        var defaultConfig = {
            el: "", //放置SelectBox的容器元素
            optionIndex: 0, //当前选项
            options: [''], //所有选项
            onOptionChange: () => {} //选择改变回调,index从0开始
        }
        this.cfg = Object.assign({}, defaultConfig, config);
        this._initComponent();
}

SelectBox.prototype._initComponent = function(){
    this._optionIndex = this.cfg["optionIndex"];
    this._options = this.cfg["options"];
    this._initSelectBox();
    this._bindEvent();
    this._renderSelectBox();
}

SelectBox.prototype._bindEvent = function(){
     var me = this;
        me.$title.click(function(e) {
            let target = $(e.target);
            if (target.hasClass("disabled")) {
                return;
            }
            if (me.$optionsContainer.is(":hidden")) {
                me.$optionsContainer.show();
                me.$title.addClass("current");
            } else {
                me.$optionsContainer.hide();
                me.$title.removeClass("current");
            }
            e.stopPropagation();
        });

        me.$selectOptions.click(function(e) {
            let target = $(e.target);
            let index = target.data('index');
            me.setOptionIndex(index);
        });

        $(document).click(function() {
            // s_title.removeClass("span_aa");
            me.$optionsContainer.hide();
            me.$title.removeClass("current");
        })
}

SelectBox.prototype.getOptionIndex = function(){
     return this._optionIndex;
}

SelectBox.prototype.setOptionIndex = function(index) {
        if (index < 0 || index >= this._options.length) return; //设置数值无效
        this._optionIndex = index;
        this._renderSelectBox();
    }

SelectBox.prototype._initSelectBox = function(){
     this.$container = $(this.cfg.el);
     this.$container.html(_.template(selectTmpl)({
        "curOption": this._options[this._optionIndex],
        "list": this._options
    }));
    this.$title = this.$container.find('.select_box .js-title');
    this.$selectOptions = this.$container.find(".select_box li");
    this.$optionsContainer = this.$container.find(".select_box ul");
}

SelectBox.prototype._renderSelectBox = function(){
    this.cfg.onOptionChange && this.cfg.onOptionChange(this._optionIndex);
    this.$optionsContainer.hide();
    this.$title.html(this._options[this._optionIndex] + '<em class="arrow-icon icon">');
    this.$selectOptions.removeClass("current").eq(this._optionIndex).addClass("current");
}
module.exports =  SelectBox;