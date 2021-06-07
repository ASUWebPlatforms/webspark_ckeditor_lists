/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights
 *   reserved. For licensing, see LICENSE.md or
 *   https://ckeditor.com/legal/ckeditor-oss-license
 */

(function () {
  function getListElement(editor, listTag) {
    var range;
    try {
      range = editor.getSelection().getRanges()[0];
    }
    catch (e) {
      return null;
    }

    range.shrink(CKEDITOR.SHRINK_TEXT);
    return editor.elementPath(range.getCommonAncestor()).contains(listTag, 1);
  }

  var listItem = function (node) {
    return node.type == CKEDITOR.NODE_ELEMENT && node.is('li');
  };

  function listStyle(editor, startupPage) {
    var lang = editor.lang.liststyle;
    if (startupPage == 'bulletedListStyle') {
      return {
        title: lang.bulletedTitle,
        minWidth: 300,
        minHeight: 50,
        contents: [{
          id: 'info',
          accessKey: 'I',
          elements: [
            {
              type: 'select',
              label: 'Color',
              id: 'color',
              align: 'center',
              style: 'width:150px',
              items: [
                [lang.notset, ''],
                ['Default', 'default-list'],
                ['Maroon', 'maroon'],
                ['Light Smoke Mode', 'light-smokemode'],
                ['Smoke Mode', 'smokemode'],
                ['Dark Mode', 'darkmode'],
                ['Dark Mode Gold', 'darkmode-gold']
              ],
              setup: function (element) {
                // Always default to default.
                this.setValue('default-list');
              },
              commit: function (element) {
                // Get select value.
                var value = this.getValue();

                if (value == '') {
                  value = 'default-list';
                }

                // Add class after removing existing class.
                if (value) {
                  if (element.hasClass('default-list') && value != 'default-list') {
                    element.removeClass('default-list');
                  }
                  if (element.hasClass('default-list') && value != 'default-list') {
                    element.removeClass('default-list');
                  }
                  if (element.hasClass('maroon') && value != 'maroon') {
                    element.removeClass('maroon');
                  }
                  if (element.hasClass('light-smokemode') && value != 'light-smokemode') {
                    element.removeClass('light-smokemode');
                  }
                  if (element.hasClass('smokemode') && value != 'smokemode') {
                    element.removeClass('smokemode');
                  }
                  if (element.hasClass('darkmode') && value != 'darkmode') {
                    element.removeClass('darkmode');
                  }
                  if (element.hasClass('darkmode') && element.hasClass('gold') && value != 'darkmode-gold') {
                    element.removeClass('darkmode');
                    element.removeClass('gold');
                  }
                  if (value == 'darkmode-gold') {
                    element.addClass('darkmode');
                    element.addClass('gold');
                  }
                  else {
                    element.addClass(value);
                  }
                }
                if (!element.hasClass('uds-list')) {
                  element.addClass('uds-list');
                }
              }
            }
          ],

        }],
        onShow: function () {
          var editor = this.getParentEditor(),
            element = getListElement(editor, 'ul');

          element && this.setupContent(element);
        },
        onOk: function () {
          var editor = this.getParentEditor(),
            element = getListElement(editor, 'ul');

          element && this.commitContent(element);
        }
      };
    }
    else if (startupPage == 'numberedListStyle') {

      var listStyleOptions = [
        [lang.notset, ''],
        [lang.lowerRoman, 'lower-roman'],
        [lang.upperRoman, 'upper-roman'],
        [lang.lowerAlpha, 'lower-alpha'],
        [lang.upperAlpha, 'upper-alpha'],
        [lang.decimal, 'decimal']
      ];

      if (!CKEDITOR.env.ie || CKEDITOR.env.version > 7) {
        listStyleOptions.concat([
          [lang.armenian, 'armenian'],
          [lang.decimalLeadingZero, 'decimal-leading-zero'],
          [lang.georgian, 'georgian'],
          [lang.lowerGreek, 'lower-greek']
        ]);
      }

      return {
        title: lang.numberedTitle,
        minWidth: 300,
        minHeight: 50,
        contents: [{
          id: 'info',
          accessKey: 'I',
          elements: [{
            type: 'hbox',
            widths: ['25%', '75%'],
            children: [
              {
                type: 'select',
                label: 'Color',
                id: 'color',
                align: 'center',
                style: 'width:150px',
                items: [
                  [lang.notset, ''],
                  ['Default', 'default-list'],
                  ['Maroon', 'maroon'],
                  ['Light Smoke Mode', 'light-smokemode'],
                  ['Smoke Mode', 'smokemode'],
                  ['Dark Mode', 'darkmode'],
                  ['Dark Mode Gold', 'darkmode-gold'],
                  ['Step List Default', 'stp-default'],
                  ['Step List Gold Counter', 'stp-gold-counter'],
                  ['Step List Maroon Counter', 'stp-maroon-counter'],
                  ['Step List Smokemode', 'stp-smokemode'],
                  ['Step List Smokemode Gold Counter', 'stp-smokemode-gold'],
                  ['Step List Smokemode Maroon Counter', 'stp-smokemode-maroon'],
                  ['Step List Light Smokemode', 'stp-lightsmokemode'],
                  ['Step List Light Smokemode Gold Counter', 'stp-lightsmokemode-gold'],
                  ['Step List Light Smokemode Maroon Counter', 'stp-lightsmokemode-maroon'],
                  ['Step List Darkmode', 'stp-darkmode'],
                  ['Step List Darkmode Gold Counter', 'stp-darkmode-gold']
                ],
                setup: function (element) {
                  // Always default to default.
                  this.setValue('default-list');
                },
                commit: function (element) {
                  // Get select value.
                  var value = this.getValue();

                  if (value == '') {
                    value = 'default-list';
                  }


                  // Get all the ol's and add class.
                  var nested_ol = element.$.querySelectorAll("ol");
                  var arrayLength = nested_ol.length;
                  for (var i = 0; i < arrayLength; i++) {
                    console.log(nested_ol[i]);
                    // nested_ol[i].addClass('uds-list');
                  }

                  // If value starts with stp its a step value.
                  if (value.startsWith('stp')) {
                    // Add required classes for steplist.
                    element.addClass('uds-list');
                    element.addClass('uds-steplist');


                    // Remove NLR clases.
                    if (value == 'stp-default') {
                      // Remove NLR classes.
                      element.remove('uds-steplist-gold');
                      element.remove('uds-steplist-maroon');
                      element.remove('smokemode');
                      element.remove('light-smokemode');
                      element.remove('darkmode');
                      element.remove('maroon');
                    }
                    // Default gold.
                    if (value == 'stp-gold-counter') {
                      // Remove NLR classes.
                      element.remove('uds-steplist-maroon');
                      element.remove('smokemode');
                      element.remove('light-smokemode');
                      element.remove('darkmode');

                      // Add classes.
                      element.addClass('uds-steplist-gold');
                    }
                    // Default maroon.
                    if (value == 'stp-maroon-counter') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-gold');
                      element.removeClass('smokemode');
                      element.removeClass('light-smokemode');
                      element.removeClass('darkmode');

                      // Add classes.
                      element.addClass('uds-steplist-maroon');
                    }
                    // Smoke mode.
                    if (value == 'stp-smokemode') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-gold');
                      element.removeClass('uds-steplist-maroon');
                      element.removeClass('light-smokemode');
                      element.removeClass('darkmode');

                      // Add classes.
                      element.addClass('smokemode');
                    }
                    // Smoke mode gold.
                    if (value == 'stp-smokemode-gold') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-maroon');
                      element.removeClass('light-smokemode');
                      element.removeClass('darkmode');

                      // Add classes.
                      element.addClass('smokemode');
                      element.addClass('uds-steplist-gold');
                    }
                    // Smoke mode maroon.
                    if (value == 'stp-smokemode-maroon') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-maroon');
                      element.removeClass('light-smokemode');
                      element.removeClass('darkmode');

                      // Add classes.
                      element.addClass('smokemode');
                      element.addClass('uds-steplist-maroon');
                    }
                    // Light Smoke mode.
                    if (value == 'stp-lightsmokemode') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-gold');
                      element.removeClass('uds-steplist-maroon');
                      element.removeClass('smokemode');
                      element.removeClass('darkmode');

                      // Add classes.
                      element.addClass('light-smokemode');
                    }
                    // Light Smoke mode gold.
                    if (value == 'stp-lightsmokemode-gold') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-maroon');
                      element.removeClass('smokemode');
                      element.removeClass('darkmode');

                      // Add classes.
                      element.addClass('light-smokemode');
                      element.addClass('uds-steplist-gold');
                    }
                    // Light Smoke mode maroon.
                    if (value == 'stp-lightsmokemode-maroon') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-gold');
                      element.removeClass('smokemode');
                      element.removeClass('darkmode');

                      // Add classes.
                      element.addClass('light-smokemode');
                      element.addClass('uds-steplist-maroon');
                    }
                    // Darkmode.
                    if (value == 'stp-darkmode') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-gold');
                      element.removeClass('uds-steplist-maroon');
                      element.removeClass('smokemode');
                      element.removeClass('light-smokemode');

                      // Add classes.
                      element.addClass('darkmode');
                    }
                    // Darkmode gold.
                    if (value == 'stp-darkmode-gold') {
                      // Remove NLR classes.
                      element.removeClass('uds-steplist-maroon');
                      element.removeClass('smokemode');
                      element.removeClass('light-smokemode');

                      // Add classes.
                      element.addClass('darkmode');
                      element.addClass('uds-steplist-gold');
                    }
                  }

                  else {
                    // Remove step list elements.
                    element.removeClass('uds-steplist');
                    element.removeClass('uds-steplist-maroon');
                    element.removeClass('uds-steplist-gold');

                    // Add class after removing existing class.
                    if (value) {
                      // Ensure the step list class is not applied.
                      element.removeClass('uds-steplist');
                      // Add remove classes as required.
                      if (element.hasClass('default-list') && value != 'default-list') {
                        element.removeClass('default-list');
                      }
                      if (element.hasClass('maroon') && value != 'maroon') {
                        element.removeClass('maroon');
                      }
                      if (element.hasClass('light-smokemode') && value != 'light-smokemode') {
                        element.removeClass('light-smokemode');
                      }
                      if (element.hasClass('smokemode') && value != 'smokemode') {
                        element.removeClass('smokemode');
                      }
                      if (element.hasClass('darkmode') && value != 'darkmode') {
                        element.removeClass('darkmode');
                      }
                      if (element.hasClass('darkmode') && element.hasClass('gold') && value != 'darkmode-gold') {
                        element.removeClass('darkmode');
                        element.removeClass('gold');
                      }
                      if (value == 'darkmode-gold') {
                        element.addClass('darkmode');
                        element.addClass('gold');
                      }
                      else {
                        element.addClass(value);
                      }
                    }
                    // Apply uds-list class if element does not have it.
                    if (!element.hasClass('uds-list')) {
                      element.addClass('uds-list');
                    }
                  }
                }
              }]
          }]
        }],
        onShow: function () {
          var editor = this.getParentEditor(),
            element = getListElement(editor, 'ol');

          element && this.setupContent(element);
        },
        onOk: function () {
          var editor = this.getParentEditor(),
            element = getListElement(editor, 'ol');

          element && this.commitContent(element);
        }
      };
    }
  }

  CKEDITOR.dialog.add('numberedListStyle', function (editor) {
    return listStyle(editor, 'numberedListStyle');
  });

  CKEDITOR.dialog.add('bulletedListStyle', function (editor) {
    return listStyle(editor, 'bulletedListStyle');
  });
})();
