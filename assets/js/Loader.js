const MSG_LIMIT = 50

let loader = {
  loaded: [],

  loadJS: function (path) {
    if (!path.endsWith('.js')) {
      error('Invalid JS Path')
    }

    $.ajax({
      url: `${path}`,
      dataType: "text",
      success: (js) => {
        $("body").append(`<script>${js} //# sourceURL=${path}</script>`);
        $(document).trigger(`${path}-loaded`)
      }
    })
  },

  loadHTML: function (path, target) {
    $.ajax({
      url: `${path}`,
      dataType: "html",
      success: (html) => {
        $(target).html(html);
      },
      error: (xhr) => {
        let msg = xhr.responseText.length > MSG_LIMIT ? xhr.responseText.slice(0, MSG_LIMIT) + '...' : xhr.responseText
        Swal.fire({
          icon: "error",
          title: `Error Loading HTML`,
          text: `${xhr.status} ${msg}`
        });
      }
    });
  },

  loadComponent: function (path, target) {
    let path_splitted = path.split('/')
    let component = path_splitted[path_splitted.length - 1]

    $.ajax({
      url: `${path}/${component}.html`,
      success: (html) => {
        $(target).html(html);

        if (!loader.loaded.includes(path)) {
          $.ajax({
            url: `${path}/${component}.css`,
            dataType: "text",
            success: (css) => {
              $("head").append(`<style>${css} /*# sourceURL=${path}/${component}.css */</style>`);
            },
            error: (xhr) => {
              let msg = xhr.responseText.length > MSG_LIMIT ? xhr.responseText.slice(0, MSG_LIMIT) + '...' : xhr.responseText
              Swal.fire({
                icon: "error",
                title: `Error Loading ${component}`,
                text: `${xhr.status} ${msg}`
              });
            }
          });
          $.ajax({
              url: `${path}/${component}.js`,
              dataType: "text",
              success: (js) => {
                $("body").append(`<script>${js} //# sourceURL=${path}/${component}</script>`);
                $(document).trigger(`${path}-loaded`);
                loader.loaded.push(path);
              },
              error: (xhr) => {
                let msg = xhr.responseText.length > MSG_LIMIT ? xhr.responseText.slice(0, MSG_LIMIT) + '...' : xhr.responseText
                Swal.fire({
                  icon: "error",
                  title: `Error Loading ${component}`,
                  text: `${xhr.status} ${msg}`
                })
              }
            });
          }
        else {
          $(document).trigger(`${path}-loaded`);
        }
      }
    });
  }
};