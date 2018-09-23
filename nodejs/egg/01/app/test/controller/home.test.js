const {
    app,
    mock,
    assert
} = require('egg-mock/bootstrap')

describe('tet/controller/home.test.js', () => {
    describe("GET /", () => {
        it('should status 200 and get the body', () => {
            // 对app发起 'GET /' 请求
            return app.httpRequest().get('/').expect(200).expect('hello world'); // 期望body是hello world
        });

        it('should send multi requests', async () => {
            // 使用generator function方式写测试用例，可以在一个用例中串行发起多次请求
            await app.httpRequest().get('/').expect(200).expect('hello world');

            // 再请求一次
            const result = await app.httpRequest().get('/').expect(200).expect('hello world');

            assert(result.status === 200);
        })
    })
})