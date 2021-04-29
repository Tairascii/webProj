from django.urls import path, re_path
from rest_framework_jwt.views import obtain_jwt_token
from api.views import show_cats, show_subcats, show_products, show_users, user_detail
from api.views import CommentListAPIView, CommentDetailAPIView, product_detail

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('categories/', show_cats),
    path('subcategories/<int:catId>', show_subcats),
    path('products/', show_products),
    path('users/', show_users),
    path('users/<int:user_id>/', user_detail),
    path('products/<int:prodId>/comments/', CommentListAPIView.as_view()),
    path('products/<int:prodId>/comments/<int:pk>', CommentDetailAPIView.as_view()),
    path('products/<int:prodId>', product_detail),
]