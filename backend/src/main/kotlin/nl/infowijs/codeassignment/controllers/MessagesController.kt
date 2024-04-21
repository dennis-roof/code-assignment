package nl.infowijs.codeassignment.controllers

import io.vertx.core.json.JsonArray
import io.vertx.ext.web.RoutingContext
import nl.infowijs.codeassignment.models.Message
import nl.infowijs.codeassignment.models.Person
import nl.infowijs.codeassignment.modules.WebResponse
import java.time.Instant
import java.time.temporal.ChronoUnit

fun initDummyMessages(): JsonArray {
  val messages = JsonArray()

  messages.add(Message(
    message = "Wie staat er dubbel geparkeerd in vak 14/15 met kenteken ZS-234-GA?\nIk kom mijn auto niet meer in...\n\nGraag je auto verplaatsen vóór 16:00 zodat ik weer naar huis kan!!!",
    datetime = Instant.now().minusSeconds(1500).truncatedTo(ChronoUnit.SECONDS),
    person = Person(
      firstname = "Karen",
      lastname = "Monster",
      avatar = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
    )
  ).toJsonObject())

  messages.add(Message(
    message = "Hallo collega's,\n\nzouden jullie in week 35 de hele week een parkeerplaats voor mij willen reserveren?\n\nDank!",
    datetime = Instant.now().minusSeconds(43200).truncatedTo(ChronoUnit.SECONDS),
    person = Person(
      firstname = "Melanie",
      lastname = "de Vries",
      avatar = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
    )
  ).toJsonObject())

  return messages
}

class MessagesController {
  val messages = initDummyMessages()
  
  fun listMessages(routingContext: RoutingContext) {
    WebResponse(routingContext).end(messages)
  }

  fun addMessage(routingContext: RoutingContext) {
    val bodyJson = routingContext.body().asJsonObject()

    if (!bodyJson.containsKey("message")) {
      routingContext.response().setStatusCode(422).end("JSON input is missing 'message' key")
      return
    }

    messages.add(Message(
      message = bodyJson.getString("message"),
      datetime = Instant.now().truncatedTo(ChronoUnit.SECONDS),
      // TODO: replace Person with currently logged in user
      person = Person(
        firstname = "Myself",
        lastname = "",
        avatar = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
      )
    ).toJsonObject())

    WebResponse(routingContext).end(messages)
  }
}
