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

    $( "#submit-to-payment" ).click(function( event ) {
        event.preventDefault(); // هام لمنع السلوك الافتراضي
        
        $(location).attr('href', "payment.html");
      });

    // إضافة المدن حسب الدولة
    var citiesBycountry = {
        ye: ['غيل باوزير','المكلا','عدن'],
        sa: ['الرياض','جدة'],
        eg: ['القاهرة','الإسكندرية'],
        jo: ['عمان','الزرقاء'],
        sy: ['دمشق','حلب','حماه']
    };
    // عندما يتغير الدولة يتم اختيار المدينة من المصفوفة الاعلى
    $('#form-checkout select[name="country"]').change(function(){
        //جلب رمز الدولة
        var country = $(this).val();

        //جلب مدن من المصفوفه الاعلى
        var cities = citiesBycountry[country];

        //تفريغ قائمة المدن القديمة
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        //أضف المدن إلى القائمة
        cities.forEach(function(city){
            var $newOption = $('<option></option>');
            $newOption.text(city);
            $newOption.val(city);

            $('#form-checkout select[name="city"]').append($newOption);
        });
    });

    // عند اختيار طريقة الدفع إلى بطاقة ائتمانية تفعل الحقول والعكس تقفل
    $('#form-checkout input[name="payment_method"]').change(function(){

        //جلب القيمة المختارة
        var paymentMethod = $(this).val();

        if(paymentMethod === 'on_delivery'){
            //إذا كانت الاختيار على الدفع عند الاستلام يقوم إقفل الحقول
            $('#credit-card-info input').prop('disabled',true);
        }else{
            // في حال العكس فعل الحقول
            $('#credit-card-info input').prop('disabled',false);
        }

        //بدل معلومات بطاقة الائتمانية بين الظهور والاخفاء
        $('#credit-card-info').toggle();
    });

});