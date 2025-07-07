package chat.analysis.ai.sharereceiver

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import chat.analysis.ai.MainActivity

class ShareReceiverActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val incoming = intent
    val out = Intent(this, MainActivity::class.java).apply {
      addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)
      action = incoming.action
      type = incoming.type
      
      if (incoming.action == Intent.ACTION_SEND) {
        incoming.getParcelableExtra<Uri>(Intent.EXTRA_STREAM)?.let {
          putExtra(Intent.EXTRA_STREAM, it)
        }
      } else if (incoming.action == Intent.ACTION_SEND_MULTIPLE) {
        putParcelableArrayListExtra(
          Intent.EXTRA_STREAM,
          incoming.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)
        )
      }
    }

    startActivity(out)
    finish()
  }
}
