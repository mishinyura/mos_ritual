// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });

// document.addEventListener('keydown', function (e) {
//   // F12
//   if (e.key === 'F12') {
//     e.preventDefault();
//   }

//   // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
//   if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
//       (e.ctrlKey && e.key === 'U')) {
//     e.preventDefault();
//   }
// });



function main() {
  switch (document.querySelector('meta[name="title"]').content) {
    case 'catalog': new CatalogPage() 
    break;
    case 'index': new IndexPage()
  }
  
}

main()