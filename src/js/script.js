$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $('[data-add-to-cart]').click(function(e){
        alert('أضيف المُنتج إلى عربة الشراء');
        e.stopPropagation();
    });

    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    //حذف منتج من السلة

    $('[data-remove-from-cart]').click(function(){
        // تحديد العنصر المختار وحذفه
        $(this).parents('[data-product-info]').remove();

        // تحديث إجمالي المنتجات
        calculateTotalPrice();
    });

    // عند تغيير كمية المنتج
    $('[data-product-quantity]').change(function(){

        // جلب القيمة الجديدة
        var newQuantity = $(this).val();

        //ابحث عن السطر الذي يحتوي معلومات هذا المنتج
        var $parent =$(this).parents('[data-product-info]');

        //جلب سعر القطعة الواحدة من معلومات المنتج
        var pricePerUnit = $parent.attr('data-product-price');

        //عملية حسابية لمعرفة إجمالي سعر المنتج
        var totalPriceForProduct = newQuantity * pricePerUnit;

        //عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذا السطر
        $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        // نداء الدالة جمع كل المنتجات
        calculateTotalPrice();
    });

    // أمر حساب إجمالي جميع المنتجات
    
    function calculateTotalPrice(){

        //إنشئ متغير لحفظ السعر الإجمالي ونعطيه قيمة ابتدائي صفر
        var totalPriceForAllProducts = 0;

        //نقوم بعمل أمر حلقة دورانية ليقوم بالمرور على جميع المنتجات وتطبيق عليهم الاوامر التالي
        $('[data-product-info]').each(function(){
            
            // جلب سعر القطعة الواحدة
            var pricePerUnit = $(this).attr('data-product-price');

            //جلب كمية المنتج
            var quantity = $(this).find('[data-product-quantity]').val();

            //عملية ضرب بين السعر وعدد
            var totalPriceForProduct = pricePerUnit * quantity;

            // إضافة قيمة إجمالي المنتج في قيمة إجمالي جميع المنتجات
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });

        $('#total-price-for-all-products').text(totalPriceForAllProducts);
    }

});