﻿(function () {
    $(function () {

        var _$form = $('form[name=purchaseOrderEditForm]');
        var _purchaseOrderService = abp.services.app.purchaseOrder;
        var _productService = abp.services.app.product;
        var _purchaseOrderDetailService = abp.services.app.purchaseOrderDetails;

        var pieceprice;
        var boxprice;
        var caseprice;
        _$form.validate({});

        let today = new Date().toLocaleDateString();
        $("#purchaseOrderDate").val(today);
        $("#purchaseOrderDate").attr('readonly', true);

        $('#isAllowed').change(function () {
            if (this.checked) {
                $("#purchaseOrderDate").attr('readonly', false);
            }
            else {
                $("#purchaseOrderDate").attr('readonly', true);
            }
        });


        $("#purchaseOrderTable").DataTable({
            "searching": false,
            "paging": false,
            "info": false,
            "language": {
                "emptyTable": " "
            },
            "ordering": false,
            "fixedHeader": true,
            "responsive": true,
            "autoWidth": true,
            "scrollY": "300px",
            "scrollCollapse": true
        });

        var lastNumber = 0;
        $("input[name=ProductId]").each(function () {
            lastNumber = + 1;
        });
        console.log(lastNumber);
        var x = lastNumber + 1;
        $("#addBtn").click(function () {

            $("#purchaseOrderTable").append(
                "<tr id='" + x + "'>" +
                "<td>" + "<input class='hidden' name='ProductId' data-prod-idd=' " + x + "' /><input class='hidden' name='PricePerPiece' data-prod-pricepiece=' " + x + "' /><input class='hidden' name='ProdCase' data-prod-prodcase=' " + x + "' /><input id='prodCode' data-prod-code=' " + x + "' name='Code' type='text' class='form-control' size='10' />" + "</td>" +
                "<td class='tblDesc' nowrap>" + "<input id='prodDesc' name='Description' type='text' data-prod-desc=' " + x + "' class='form-control' style='width: 100%;' size='30' readonly />" + "</td > " +
                "<td class='tblCases'>" + "<input type='text' id='cases' name='Case' data-prod-cases=' " + x + "' class='form-control' size='4' />" + "</td>" +
                "<td class='tblBox'>" + "<input type='text' id='boxes' name='Box' data-prod-boxes=' " + x + "' class='form-control' size='4' />" + "</td>" +
                "<td class='tblPcs'>" + "<input type='text' id='pieces' name='Piece' data-prod-pieces=' " + x + "' class='form-control' size='4' />" + "</td>" +
                "<td class='tblPrice'>" + "<input id='sumPrice' type='text' data-prod-price=' " + x + "' name='TotalProductPrice' class='form-control' size='10' />" + "</td>" +
                "<td class='tblGross'>" + "<input type='text' name='Gross' data-prod-gross=' " + x + "' class='form-control' size='10' />" + "</td > " +
                "<td class='tblNet'>" + "<input type='text' data-prod-net=' " + x + "' name='Net' class='form-control' size='10' />" + "</td > " +
                "<td>" + "<button class='delProd'><i class='material-icons'>delete_sweep</i></button>" + "</td>" +
                "</tr>"
            );
            x++;
        });

        $("#purchaseOrderTable").on('click', '.delProd', function () {
            $(this).closest('tr').remove();
            getTotal();
            var Id = $(this).closest('tr').find("input[name='Id']").val();
            _purchaseOrderDetailService.delete({ id: Id });
        });

        $("#purchaseOrderTable").on('change', '#prodCode', function () {
            var code = $(this).closest('td').find("input[name='Code']").val();
            var prodId = $(this).attr("data-prod-code");
            _productService.getProductByCode(code).done(function (result) {
                caseprice = result.net;
                boxprice = result.pricePerBox;
                pieceprice = result.pricePerPiece;
                $("input[data-prod-idd='" + prodId + "']").val(result.id);
                $("input[data-prod-desc='" + prodId + "']").val(result.itemName);
                $("input[data-prod-pricepiece='" + prodId + "']").val(result.pricePerPiece);
                $("input[data-prod-prodcase='" + prodId + "']").val(result.cases);
                $("input[data-prod-prodpiece='" + prodId + "']").val(result.pieces);
            });
        });

        $("#purchaseOrderTable").on('change', '#pieces', function () {
            var prodId = $(this).attr("data-prod-pieces");
            console.log(prodId);
            var code = $("input[data-prod-code='" + prodId + "']").val();
            console.log(code);
            _productService.getProductByCode(code).done(function (result) {
                caseprice = result.net;
                boxprice = result.pricePerBox;
                pieceprice = result.pricePerPiece;
                grossNet(prodId);
            });
        });
        function grossNet(prodId) {
            var caseval = $("input[data-prod-cases='" + prodId + "']").val();
            var boxval = $("input[data-prod-boxes='" + prodId + "']").val();
            var pieceval = $("input[data-prod-pieces='" + prodId + "']").val();
            var summ;
            if (caseval > 0 && boxval > 0 && pieceval > 0) {
                summ = (caseprice + boxprice + pieceprice).toFixed(2);
                $("input[data-prod-price='" + prodId + "']").val(summ);
            }
            else if (caseval > 0 && boxval > 0 && pieceval == 0) {
                summ = (caseprice + boxprice).toFixed(2);
                $("input[data-prod-price='" + prodId + "']").val(summ);
            }
            else if (caseval > 0 && boxval == 0 && pieceval > 0) {
                summ = (caseprice + pieceprice).toFixed(2);
                $("input[data-prod-price='" + prodId + "']").val(summ);
            }
            else if (caseval == 0 && boxval > 0 && pieceval > 0) {
                summ = (pieceprice + boxprice).toFixed(2);
                $("input[data-prod-price='" + prodId + "']").val(summ);
            }
            else if (caseval > 0 && boxval == 0 && pieceval == 0) {
                summ = (caseprice).toFixed(2);
                $("input[data-prod-price='" + prodId + "']").val(summ);
            }
            else if (caseval == 0 && boxval > 0 && pieceval == 0) {
                summ = (boxprice).toFixed(2);
                $("input[data-prod-price='" + prodId + "']").val(summ);
            }
            else if (caseval == 0 && boxval == 0 && pieceval > 0) {
                summ = (pieceprice).toFixed(2);
                $("input[data-prod-price='" + prodId + "']").val(summ);
            } else {
                summ = 0;
                $("input[data-prod-price='" + prodId + "']").val(summ);
            }
            var casess = caseprice * caseval;
            var boxess = boxprice * boxval;
            var piecess = pieceprice * pieceval;
            var sum = (casess + boxess + piecess).toFixed(2);
            $("input[data-prod-gross='" + prodId + "']").val(sum);
            var netnet = (sum);
            $("input[data-prod-net='" + prodId + "']").val(netnet);

            getTotal();
        }
        function getTotal() {
            let totalCase = 0;
            var totalBox = 0;
            var totalPcs = 0;
            var totalGross = 0;
            var totalDiscount = 0;
            var totalNet = 0;
            var vatable = 0;
            var vat = 0;

            $("input[name = Case]").each(function () {
                if ($(this).val() != "") {
                    var value = parseInt($(this).val());
                    totalCase += value;
                }
            });
            $("input[name=TotalCase]").val(totalCase);

            $("input[name = Box]").each(function () {
                if ($(this).val() != "") {
                    var value = parseInt($(this).val());
                    totalBox += value;
                }
            });
            $("input[name=TotalBox]").val(totalBox);

            $("input[name = Piece]").each(function () {
                if ($(this).val() != "") {
                    var value = parseInt($(this).val());
                    totalPcs += value;
                }
            });
            $("input[name=TotalPiece]").val(totalPcs);

            $("input[name= Gross]").each(function () {
                if ($(this).val() != "") {
                    var value = parseFloat($(this).val());
                    totalGross += value;
                }
            });
            $("input[name=TotalGross]").val(totalGross);

            $("input[name= Discount]").each(function () {
                if ($(this).val() != "") {
                    var value = parseFloat($(this).val());
                    totalDiscount += value;
                }
            });
            $("input[name=TotalDiscount]").val(totalDiscount);

            $("input[name= Net]").each(function () {
                if ($(this).val() != "") {
                    var value = parseFloat($(this).val());
                    totalNet += value;
                }
            });
            $("input[name=TotalNet]").val(totalNet);
            vatable = (totalNet / 1.12).toFixed(2);
            vat = (vatable * .12).toFixed(2);
            $("#vatable").val(vatable);
            $("#vat").val(vat);
        }

        _$form.find('button[type="submit"]').click(function (e) {
            e.preventDefault();

            if (!_$form.valid()) {
                return;
            }

            var purchaseOrder = _$form.serializeFormToObject();

            purchaseOrder.purchaseOrderDetails = [];
            $("input[name=ProductId]").each(function () {
                var data = {};
                if ($(this).val() > 0) {
                    $(this).closest('tr').each(function () {
                        $('input', this).each(function () {
                            data[$(this).attr('name')] = $(this).val();
                        });
                    });
                    purchaseOrder.purchaseOrderDetails.push(data);
                }
            });
            abp.ajax({
                url: abp.appPath + 'PurchaseOrder/EditPurchaseOrder',
                type: 'POST',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: 'json',
                data: purchaseOrder,
                success: function (result) {
                    //console.log(result);
                    var purchaseOrderId = result.id;
                    location.href = "/PurchaseOrder/View?purchaseOrderId=" + purchaseOrderId;
                },
                error: function (e) { console.log(e); }
            });
            /*abp.ui.setBusy(_$form);
            _purchaseOrderService.update(purchaseOrder).done(function (result) {
                var purchaseOrderId = result.id;
                location.href = "/PurchaseOrder/View?purchaseOrderId=" + purchaseOrderId;
            }).always(function () {
                abp.ui.clearBusy(_$form);
            });
            */
        });
    });
})();
