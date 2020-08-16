const indexCtrl = {};

indexCtrl.renderindex = (req, res)=>{
    req.session.destroy();
    req.logout();
    res.render('index');
};

module.exports = indexCtrl;