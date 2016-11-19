/**
 * Created by Administrator on 2016/10/10.
 */
/*swt*/
function swt(a) {
	openZoosUrl('chatwin', '&e=' + a);
	return false;
}
$(document).ready(function () {
	$('.wrapper .btn').click(
		function () {
			swt('11znjh');
		})
})