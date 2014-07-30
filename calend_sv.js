function Calend_Sv(target) {
	var my = this;
	var cs = Calend_Sv;
	var div = cs.div;
	my.target = target;
	my.date = cs.today; // selected date
	my.month = my.date.getMonth(); // currently displayed month
	my.year = my.date.getFullYear(); // currently displayed year
	my.attach_click = function(elem, year, month, day) {
		elem.off();
		if(!year) return;
		elem.click(function() {
			my.target.val(day + '-' + month + '-' + year);
			cs.div.hide();
		});
	}
	my.draw = function() {
		cs.month_div.html(cs.month[my.month] + ' ' + my.year);
		cs.prev_div.off('click');
		cs.next_div.off('click');
		cs.prev_div.click(function() {
			--my.month;
			if(my.month < 0) {
				my.month = 11;
				--my.year;
			}
			my.draw();
		});
		cs.next_div.click(function() {
			++my.month;
			if(my.month > 11) {
				my.month = 0;
				++my.year;
			}
			my.draw();
		});
		var first = new Date(my.year, my.month, 1);
		var offset = first.getDay();
		var max = offset + new Date(my.year, my.month + 1, 0).getDate()
									-1;
		var today_date = -1; // highlight today's date
		if(cs.today.getMonth() == my.month &&
					cs.today.getFullYear() == my.year) {
			today_date = cs.today.getDate();
		}
		console.log(cs.today.getMonth() + ' ' + my.month + ' '
			+ cs.today.getFullYear() + ' '  + my.year + today_date);
		for(var i = 0; i < 42; ++i) {
			if(i < offset || i > max) {
				cs.day_div[i].html('');
				cs.day_div[i].removeClass('today');
				my.attach_click(cs.day_div[i], 0, 0, 0);
				continue;
			}
			var day = i - offset + 1;
			cs.day_div[i].html(day);
			if(today_date == day) {
				cs.day_div[i].addClass('today');
			} else {
				cs.day_div[i].removeClass('today');
			}
			my.attach_click(cs.day_div[i], my.year,
					my.month + 1, day);
		}
		div.show();
	}
	my.click = function() { // when clicking on the input, window is drawn
		Calend_Sv.div.css({"left": target.offset().left,
			"top": target.offset().top});
		my.draw();
	}
	target.click(function(e) {
		e.stopPropagation();
		my.click();
	});
}

Calend_Sv.div = jQuery('<div>').addClass('calend_sv_div').hide();
Calend_Sv.today = new Date();
Calend_Sv.month = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'];
Calend_Sv.weekdy = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

jQuery(document).ready(function() {
	var cs = Calend_Sv;
	var div = cs.div;
	// initialize the internal window structure
	cs.prev_div = jQuery('<div>').addClass('prev').append('&lt;');
	cs.month_div = jQuery('<div>').addClass('month');
	cs.next_div = jQuery('<div>').addClass('next').append('&gt;');
	div.append(cs.prev_div).append(cs.next_div).append(cs.month_div);
	// add 7 divs representing days of week
	cs.wday_div = [];
	for(var i = 0; i < 7; ++i) {
		cs.wday_div[i] = jQuery('<div>').addClass('wday').append(
			cs.weekdy[i]);
		div.append(cs.wday_div[i]);
	}
	// add 42 divs representing days of month
	cs.day_div = [];
	for(var i = 0; i < 42; ++i) {
		cs.day_div[i] = jQuery('<div>').addClass('day').append(i);
		div.append(cs.day_div[i]);
		if(!(i % 7)) {
			cs.day_div[i].css('clear', 'left');
		}
	}
	jQuery(document.body).append(Calend_Sv.div);
	jQuery(document).click(function(ev) {
		// check if click is within the rectangle of our div
		//Calendar_Sv.div.width();
		if(!div.is(":visible")) return; // already hidden
		var left = div.position().left;
		var top = div.position().top;
		if(ev.pageX < left ||
					ev.pageX > (left + div.width()) ||
					ev.pageY < top ||
					ev.pageY > (top + div.height())) {
			Calend_Sv.div.hide();
		}
	});
});


