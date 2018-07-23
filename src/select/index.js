// scss
import "./select.scss";
//ejs
import selectTmpl from "!!ejs-loader!./select.ejs";

/**
 * 自定义下拉框
 */
class SelectBox {
    constructor(config) {
        let defaultConfig = {
            el: "", //放置SelectBox的容器元素
            optionIndex: 0, //当前选项
            options: [''], //所有选项
            onOptionChange: () => {} //选择改变回调,index从0开始
        }
        this.cfg = Object.assign({}, defaultConfig, config);
        this._initComponent();
    }

    _initComponent() {
        this._optionIndex = this.cfg["optionIndex"];
        this._options = this.cfg["options"];
        this._initSelectBox();
        this._bindEvent();
        this._renderSelectBox();
    }

    _bindEvent() {
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
            me.optionIndex = index;
        });

        $(document).click(function() {
            // s_title.removeClass("span_aa");
            me.$optionsContainer.hide();
            me.$title.removeClass("current");
        })
    }

    get optionIndex() {
        return this._optionIndex;
    }

    set optionIndex(index) {
        if (index < 0 || index >= this._options.length) return; //设置数值无效
        this._optionIndex = index;
        this._renderSelectBox();
    }

    _initSelectBox() {
        this.$container = $(this.cfg.el);
        this.$container.html(selectTmpl({
            "curOption": this._options[this._optionIndex],
            "list": this._options
        }));
        this.$title = this.$container.find('.select_box .js-title');
        this.$selectOptions = this.$container.find(".select_box li");
        this.$optionsContainer = this.$container.find(".select_box ul");
    }

    _renderSelectBox() {
        this.cfg.onOptionChange && this.cfg.onOptionChange(this.optionIndex);
        this.$optionsContainer.hide();
        this.$title.html(this._options[this._optionIndex] + '<em class="arrow-icon icon">');
        this.$selectOptions.removeClass("current").eq(this._optionIndex).addClass("current");
    }

}

export default SelectBox;