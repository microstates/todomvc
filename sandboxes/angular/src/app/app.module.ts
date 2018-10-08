import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { create } from "microstates";
import TodoMVC from "@microstates/todomvc";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
