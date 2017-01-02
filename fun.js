/**
 * Created by Administrator on 2016/12/26.
 */
function shellCallback(err) {
    if (err) {
        cb(err);
        return;
    }

    console.log(stdout);
    cb();
}