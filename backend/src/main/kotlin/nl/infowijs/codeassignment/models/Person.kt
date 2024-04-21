package nl.infowijs.codeassignment.models

import io.vertx.core.json.JsonObject

data class Person(
  val firstname: String,
  val infix: String = "",
  val lastname: String,
  val avatar: String,
  val email: String? = null,
  val phone: String? = null
) {
  fun toJsonObject(): JsonObject {
    return JsonObject()
      .put("name", firstname + " " + infix + " " + lastname)
      .put("avatar", avatar)
      .apply {
        if(!email.isNullOrBlank()) {
          this.put("email", email)
        }
      }
      .apply {
        if(phone !== null && Regex("\\+?[0-9\\-]{10,13}$").matches(StringBuffer(phone))) {
          this.put("phone", phone)
        }
      }
  }
}
