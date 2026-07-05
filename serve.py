import http.server, socketserver, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
class H(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # serve real files; anything else falls back to index.html (phone-proof)
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            if self.path.split('?')[0].endswith(('.glb','.usdz','.png','.jpg','.mp3','.js','.css','.ico')):
                self.send_error(404); return
            self.path = '/index.html'
        return super().do_GET()
    def log_message(self, fmt, *args):
        with open('/tmp/neuron-serve.log', 'a') as f:
            f.write("%s %s\n" % (self.client_address[0], fmt % args))
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", 8899), H) as httpd:
    httpd.serve_forever()
