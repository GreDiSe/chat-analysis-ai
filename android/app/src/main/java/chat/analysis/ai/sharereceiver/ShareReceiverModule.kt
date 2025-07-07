package chat.analysis.ai.sharereceiver

import android.content.Intent
import android.net.Uri
import android.content.pm.PackageManager
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class ShareReceiverModule(private val reactContext: ReactApplicationContext)
  : ReactContextBaseJavaModule(reactContext) {

  init {
    Companion.instance = this
  }

  override fun getName(): String = "ShareReceiver"

  companion object {
    private var instance: ShareReceiverModule? = null
    fun getInstance(): ShareReceiverModule? = instance
  }

  /** Called from MainActivity.onNewIntent */
  fun onNewIntent(intent: Intent) {
    val action = intent.action
    val type   = intent.type
    val urls   = Arguments.createArray()

    if (Intent.ACTION_SEND == action && type != null) {
      (intent.getParcelableExtra<Uri>(Intent.EXTRA_STREAM))?.let {
        urls.pushString(it.toString())
      }
    }
    else if (Intent.ACTION_SEND_MULTIPLE == action && type != null) {
      intent.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)
        ?.forEach { urls.pushString(it.toString()) }
    }

    if (urls.size() > 0) {
      val payload = Arguments.createMap()
      payload.putArray("urls", urls)
      reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit("ShareReceived", payload)
    }
  }

  @ReactMethod
  fun openWhatsAppMenu() {
    val pm: PackageManager = reactContext.packageManager
    // Try to launch WhatsApp’s main activity
    val launchIntent = pm.getLaunchIntentForPackage("com.whatsapp")
    if (launchIntent != null) {
      launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      reactContext.startActivity(launchIntent)
    } else {
      // Fallback: send user to WhatsApp’s Play-Store page
      val storeIntent = Intent(
        Intent.ACTION_VIEW,
        Uri.parse("market://details?id=com.whatsapp")
      ).apply { addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) }
      reactContext.startActivity(storeIntent)
    }
  }
}
