"""
Dependencies:
    flask
"""

from flask import Flask, render_template, Blueprint, redirect, url_for, request, flash, session, Markup

class BirthdayInvite():

    def __init__(self,host,port):

        self.initFlask()

        self.app.run(host=host,port=port)

    def initFlask(self):
        self.app = Flask(__name__)
        self.app.config["SECRET_KEY"]="secret-key-goes-here"
        self.initPages()

    def initPages(self):

        @self.app.route("/")
        def main_index(): return redirect(url_for("main_home"))

        @self.app.route("/home/")
        def main_home():
            return render_template("home.html")

        @self.app.route("/home/", methods=["post"])
        def main_home_post():
            fields = {
                "event": request.form.get("event"),
                "date": request.form.get("date"),
                "time-1": request.form.get("time-1"),
                "time-2": request.form.get("time-2"),
                "address-1": request.form.get("address-1"),
                "address-2": request.form.get("address-2"),
                "address-3": request.form.get("address-3"),
                "address-4": request.form.get("address-4"),
                "address-5": request.form.get("address-5"),
                "address-6": request.form.get("address-6"),
                "to": request.form.get("to"),
                "from": request.form.get("from"),
                "rsvp": request.form.get("rsvp"),
                "rsvp-by": request.form.get("rsvp-by"),
            }

            invite = Markup(f"""
<div class="invite">
    <div class="invite-header">
        <h2 class="header to-name">To [NAME]</h2>
        <h1 class="header has-invited-you">{fields['from'].title()} has invited you to a party on {fields['date']}!</h1>
        <h3 class="text the-party-is">The party is {fields['event']} from {fields['time-1']} to {fields['time-2']}</h3>
    </div>

    <div class="invite-content">
        <div class="invite-address text"><bold>Come along to:</bold><br>{fields['address-1']+"<br>" if fields['address-1'] != None and fields['address-1'] != '' else '' }{fields['address-2']+"<br>" if fields['address-2'] != None and fields['address-2'] != '' else '' }{fields['address-3']+"<br>" if fields['address-3'] != None and fields['address-3'] != '' else '' }{fields['address-4']+"<br>" if fields['address-4'] != None and fields['address-4'] != '' else '' }{fields['address-5']+"<br>" if fields['address-5'] != None and fields['address-5'] != '' else '' }{fields['address-6']+"<br>" if fields['address-6'] != None and fields['address-6'] != '' else '' }</div>
        
        <div class="invite-rsvp">
            <h4 class="text please-rsvp-to">Please RSVP to {fields['rsvp']} by {fields['rsvp-by']}</h4>
        </div>
    </div>
</div>""")

            flash(invite)
            flash(fields["to"])

            return render_template("style.html")

        @self.app.errorhandler(404)
        @self.app.route("/404")
        def main_404(e=None): return "Page not found - i.e. you made a mistake"

        @self.app.errorhandler(500)
        @self.app.route("/404")
        def main_500(e=None): return "Server go boom - i.e. I made a mistake"

        @self.app.route("/help")
        def main_help(): return "This page dont exist yet :("

if __name__ == "__main__":
    BirthdayInvite("0.0.0.0",1380)
