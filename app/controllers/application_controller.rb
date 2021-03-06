class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    User.find_by_id(session[:current_user_id])
  end

  def logged_in?
    current_user.present?
  end
end
