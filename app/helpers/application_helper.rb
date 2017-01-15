module ApplicationHelper
  def current_user
    User.find_by_id(session[:current_user_id])
  end

  def assets_path(path)
    return "http://localhost:4000/#{path}" if Rails.env.development?

    manifest = Rails.application.config.assets_manifest
    path = manifest[path] if manifest && manifest[path].present?
    "/dist/#{path}"
  end

  def logged_in?
    current_user.present?
  end
end
