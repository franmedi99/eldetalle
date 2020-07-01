const indexCtrl = {};

indexCtrl.renderindex = (req, res)=>{
    req.logout();
    res.render('index');
};

module.exports = indexCtrl;