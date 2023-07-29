function hideOffcanvas(offcanvasId){
    const offcanvas = document.getElementById(offcanvasId);
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
    bsOffcanvas.hide();
}