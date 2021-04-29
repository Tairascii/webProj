from rest_framework import serializers

from api.models import Category, SubCategory, Product, User, Comment


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('id', 'name', 'cat', 'subId')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'cat', 'subcat', 'image', 'description', 'rating', 'price', 'quantity')


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    password = serializers.CharField(read_only=True)
    status = serializers.BooleanField()

    def update(self, instance, validated_data):
        instance.status = validated_data['status']
        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'userName', 'productId', 'comment', 'date')
